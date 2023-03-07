import type { Image, Images, ImageViewed } from './Images';
import type { Change, ChangesApplieds } from './History';

const addImages = (images: Images, imagesToAdd: Images): {images: Images} => ({ images: images.concat(imagesToAdd) });

const selectOneImageAsMain = ({
    images, 
    idSelected
  }: {
      images: Images,
      idSelected: number
  }): {
    images: Images,
    imageViewed: ImageViewed
  } => {

    let imageViewed: ImageViewed = {
        image: {
          id: 0,
          name: '',
          url: '',
          selected: true
        },
        changes: []
    };

    let allImages = images.map((image: Image) => {
      if(image.id === idSelected){
        imageViewed = {
          image: {
            ...image,
            url: image.url + '?',
            selected: true
          },
          changes: []
        }
        return {
          ...image,
          selected: true
        }
      } else {
        return {
          ...image,
          selected: false
        }
      }
    })

    return {
      images: allImages,
      imageViewed
    }
}

const addChangeToImage = ({
    imageViewed,
    change 
  }: { 
    imageViewed: ImageViewed,
    change: Change 
  }): ImageViewed => {

  const {image, changes} = imageViewed;
  return {
      image: {
        ...image,
        url: image.url.slice(-1) === '?' ? `${image.url}${change.name}=${change.value}` : `${image.url}&${change.name}=${change.value}`
      },
      changes: changes.concat([change])
  };
}

const removeChangeToImage = ({
    imageViewed,
    change 
  }: { 
    imageViewed: ImageViewed,
    change: Change 
  }): ImageViewed => {

  const {image, changes} = imageViewed;
  const { url }= image;

  let finalUrl = url.slice(0, url.indexOf('?'));
  let filterChanges: ChangesApplieds = [];
  let symbolIsAdded: boolean = finalUrl.charAt(finalUrl.length - 1) === '?'

  for(let i = 0; i < changes.length; i++){
    let ch = changes[i]
    
    if(ch.name !== change.name){
      filterChanges.push(ch)
      if(finalUrl.charAt(finalUrl.length - 1) !== '?' && !symbolIsAdded){
        finalUrl = finalUrl + `?${ch.name}=${ch.value}`
        symbolIsAdded = true;
      } else {
        finalUrl = finalUrl + `&${ch.name}=${ch.value}`
      }
    }
  }

  return {
      image: {
      ...image,
      url: finalUrl
      },
      changes: filterChanges 
  }
}

const UpdateOneChange = ({
    imageViewed,
    change 
  }: { 
    imageViewed: ImageViewed,
    change: Change 
  }): ImageViewed => {

  let {image, changes} = imageViewed;

   let copiedUrl = image.url;
   let finalUrl = copiedUrl.slice(0, copiedUrl.indexOf('?'));
    const validateUrl = (ch: Change, i: number): string => i === 0 ?
        finalUrl = finalUrl + `?${ch.name}=${ch.value}` :
      finalUrl = finalUrl + `&${ch.name}=${ch.value}`;


  const finalChanges: ChangesApplieds = changes.map((ch: Change, i) => {
    if(ch.name === change.name){
      validateUrl(change, i);
      return {
        ...ch,
        value: change.value
      } as Change;
    } else {
      validateUrl(ch, i);
      return ch;
    }
  });

  let finalImageViewed = {
    image: {
      ...image,
      url: finalUrl
    },
    changes: finalChanges
  }

  return finalImageViewed;
}

export {
  addImages,
  UpdateOneChange,
  addChangeToImage,
  removeChangeToImage,
  selectOneImageAsMain,
}

