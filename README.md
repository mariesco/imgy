This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Imgy Documentation 
0.[Index](https://github.com/mariesco/imgy#imgy-documentation)
1.[Functionality](https://github.com/mariesco/imgy#functionality)
2.[Stack](https://github.com/mariesco/imgy#stack)
3.[Run the project](https://github.com/mariesco/imgy#run-the-project)
4.[Implemented architecture](https://github.com/mariesco/imgy#implemented-architecture)
5.[Project construction process](https://github.com/mariesco/imgy#project-construction-process)

## Functionality 

[Imgy](https://google.com/)CAMBIAR URL POR LA REAL... is an application that allows users to quickly perform image transformations. It has a list of images to test the transformations that one wishes, however there is the possibility of uploading images. All these transformations are being recorded, which allows us to have a history of them and apply transformations from this same history.

## Stack 

- This project is created with [Next](https://nextjs.org/), however, the [architecture implemented](https://github.com/mariesco/imgy#implemented-architecture) in this app differs quite a bit from that proposed by create-react-app or next.
- [Tailwind](https://tailwindcss.com/) and [Flowbite](https://flowbite.com/) were used to style this project.
- This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
- [SWR](https://swr.vercel.app/es-ES) is used to make http requests on the client side.
- [Xstate](https://xstate.js.org/) is used as a state manager.
- Jest and react-testing-library is used for testing.

## Run the project 

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Or you can run the application inside a container:

```
# build your container 
docker build -t imgy-docker .
# run your container
docker run -p 3000:3000 imgy-docker
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Implemented architecture 

In this project I chose to implement a CLEAN architecture for demonstration purposes only. I think that these types of architectures generate additional effort for small projects of this type, but add a lot of value for large projects. As seen in the following image, the domain of the application and the use cases are developed in pure Typescript. So if you have large teams developing the UI with a technology other than React, or you prefer to use another technology for state management, you can make this change in a clean way.
![Implemented arch](https://upcdn.io/kW15b6i/raw/uploads/2023/03/07/Captura%20de%20pantalla%202023-03-06%20a%20la(s)%2020-2htD.41.17.png)

To start analyzing this project, I recommend starting from the entry point. Since this project is created with next, the route management is done from [`/pages`]...so if you go to [`/pages/index.tsx`] , you can see that the main view is imported from [`/views/Imgy.tsx `].... As can be seen in the following image, in this view I render a [`Main.tsx`] component where you can see how the union between the UI, the store controller, and the ViewModel entry point controller is made to the UI (To communicate with the useCases an MVVM pattern was followed).
![View of components](https://upcdn.io/kW15b6i/raw/uploads/2023/03/07/Captura%20de%20pantalla%202023-03-06%20a%20la(s)%2020-3zCH.52.49.png)


I am aware that several functionalities could be developed in a better way, therefore I am going to leave some notes about the [construction process](https://github.com/mariesco/imgy#project-construction-process).


## Project construction process 

You can see the way this project was built from the commit history, however I want to leave some notes:
- I didn't get to properly develop the functionality of adding data to history. As you can see, it is not tied to a use case properly.
- Once again, due to time constraints, I was unable to correctly develop the functionality of adding an image. As you can see, (in addition to not being correctly linked to the use case), the UX could be improved with some notification that it was added correctly and putting it as the main image... For reasons of time, what I did as a side effect when adding an image is to 'restart' the Init function that checks what images are available to that user.
- In the history, I would have also made improvements at the UX level. The hover effect on each story would work better, seeing the detail in a tooltip and not over generating a kind of 'accordion' on the same component. It would also work on accessibility improvements for mobile.
- Improvements in the tests: For this type of flow I like to develop the tests on the state machines, but due to time issues again I decided to opt for only developing unit tests.

Thank you for reading the documentation and reviewing the project!
