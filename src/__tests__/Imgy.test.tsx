import { render, waitFor } from '@testing-library/react';
import { getServerSideProps } from "@/pages";
import Imgy from '@/views/Imgy';
import fetchMock from "jest-fetch-mock"

const TEST_IMAGES = [{
  "url": "https://assets.imgix.net/unsplash/alarmclock.jpg",
  "name": "alarmclock.jpg"
},
{
  "url": "https://assets.imgix.net/unsplash/bear.jpg",
  "name": "bear.jpg"
},]

const NEW_IMAGE = {
  "url": "https://assets.imgix.net/unsplash/alarmclock2.jpg",
  "name": "alarmclock2.jpg"
};

const fetcher = async () => {
  const fetch = jest.fn();
  const url = "https://storage.googleapis.com/nanlabs-engineering-technical-interviews/imgix-samples-list.json";
  const res = await fetch(url);
  const images = await res.json()

  return {
    props: {
      images
    }
  }
}

fetchMock.enableMocks();
beforeEach(() => {
  fetchMock.doMock()
})


describe('List of images', () => {

  it('getServerSideProps returns list of images from the api', async () => {

     jest.spyOn({ fetcher }, 'fetcher').mockImplementation(async () => ({
         props: {
           images: TEST_IMAGES
         } 
     }))

     const response = await getServerSideProps({} as any)

     expect(fetcher).toHaveBeenCalled()
     expect(response).toEqual({
         props: {
             images: {
                 images: TEST_IMAGES
             }
         }
     })
  });

  it('List of images renders correctly', () => {
        const { getByTestId } = render(<Imgy images={ TEST_IMAGES } />)

        TEST_IMAGES.forEach(img => {
            const imgItem = getByTestId(`img-${img?.name}`)

            expect(imgItem.textContent).toContain(img?.name)
        })
  });

  it('List of images renders wrongly', () => {
        const { getByTestId } = render(<Imgy images={ TEST_IMAGES } />)

        TEST_IMAGES.forEach(img => {
            const imgItem = getByTestId(`img-${img?.name}`)

            expect(imgItem).toBeNull();
        })
  });

  it('Can add one image to the list', () => {
        const { getByTestId } = render(<Imgy images={ TEST_IMAGES } />)
        const addNewImg = jest.fn();
        const imageList = getByTestId(`image-list`);
        const NewImageElement = getByTestId(`ìmg-${NEW_IMAGE?.name}`)

        expect(addNewImg(NEW_IMAGE)).toBeCalled();

        waitFor(() =>
                expect(imageList).lastChild.toEqual(NewImageElement)
        )
  });

  it('Can not add one image to the list', () => {
        const { getByTestId } = render(<Imgy images={ TEST_IMAGES } />)
        const addNewImg = jest.fn();
        const imageList = getByTestId(`image-list`);
        const NewImageElement = getByTestId(`ìmg-${NEW_IMAGE?.name}`)

        expect(addNewImg(NEW_IMAGE)).toBeCalled();

        waitFor(() =>
                expect(imageList).lastChild.not.toEqual(NewImageElement)
        )
  });

});

describe('Generated view image', () => {

  it('Load generated view image', () => {
        const { getByTestId } = render(<Imgy images={ TEST_IMAGES } />)
        const LoadingViewedImage = getByTestId('loading-viewed-image');

        expect(LoadingViewedImage).toBeInTheDocument();
        waitFor(() =>
            expect(LoadingViewedImage).not.toBeInTheDocument()
        )
  });

  it('Error generating view image', () => {
        const { getByTestId } = render(<Imgy images={ TEST_IMAGES } />)
        const ErrorOnViewedImage = getByTestId('error-on-viewed-image');

        expect(ErrorOnViewedImage).toBeInTheDocument();
        waitFor(() =>
            expect(ErrorOnViewedImage).not.toBeInTheDocument()
        )
  });

  it('Generation of the image successfully', () => {
        const { getByTestId } = render(<Imgy images={ TEST_IMAGES } />)
        const ViewedImage = getByTestId('viewed-image');
        const ViewedImageUrl = getByTestId('viewed-image-url');

        expect(ViewedImage).toBeInTheDocument();
        expect(ViewedImageUrl).toBeInTheDocument();
  });
});

describe('Editing zone', () => {

  it('Can add one property to the viewed image', () => {
    const { getByTestId } = render(<Imgy images={ TEST_IMAGES } />)
    const InitViewedImage = TEST_IMAGES[0];
    const ViewedImageUrl = getByTestId('viewed-image-url');
    const newProperty = 'blur=30';
    const addOneProperty = jest.fn();

    expect(ViewedImageUrl).contains(InitViewedImage.url)
    expect(addOneProperty(newProperty)).toBeCalled();
    waitFor(() =>
          expect(ViewedImageUrl).contains(`${InitViewedImage.url}?${newProperty}`)
    )
 
  });

  it('Can remove one property to the viewed image', () => {
    const { getByTestId } = render(<Imgy images={ TEST_IMAGES } />)
    const InitViewedImageUrl = TEST_IMAGES[0].url + '?blur=60&rotate=30';
    const ViewedImageUrl = getByTestId('viewed-image-url');
    const propertySelected = 'blur'
    const deleteOneProperty = jest.fn();

    expect(ViewedImageUrl).contains(InitViewedImageUrl)
    expect(deleteOneProperty(propertySelected)).toBeCalled();
    waitFor(() =>
          expect(ViewedImageUrl).contains(`${TEST_IMAGES[0].url}?rotate=30`)
    )
  });

  it('Can change one property to the viewed image', () => {
    const { getByTestId } = render(<Imgy images={ TEST_IMAGES } />)
    const InitViewedImageUrl = TEST_IMAGES[0].url + '?blur=60';
    const ViewedImageUrl = getByTestId('viewed-image-url');
    const newProperty = 'blur=30';
    const changeOneProperty = jest.fn();

    expect(ViewedImageUrl).contains(InitViewedImageUrl)
    expect(changeOneProperty(newProperty)).toBeCalled();
    waitFor(() =>
          expect(ViewedImageUrl).contains(`${TEST_IMAGES[0].url}?blur=30`)
    )
 
  });

  it('Can apply history changes to the viewed image', () => {
    const { getByTestId } = render(<Imgy images={ TEST_IMAGES } />)
    const InitViewedImageUrl = TEST_IMAGES[0].url + '?blur=60';
    const ViewedImageUrl = getByTestId('viewed-image-url');
    const changeOnePropertyFromHistory = jest.fn();
    const oneHistoryChange = {
      rotate: 60,
      flip: 10
    }

    expect(ViewedImageUrl).contains(InitViewedImageUrl)
    expect(changeOnePropertyFromHistory(oneHistoryChange)).toBeCalled();
    waitFor(() =>
          expect(ViewedImageUrl).contains(`${TEST_IMAGES[0].url}?rotate=60&flip=10`)
    )
 
  });
});
