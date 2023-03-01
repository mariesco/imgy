import React, { createContext, FC, ReactNode } from 'react';
import { useInterpret } from '@xstate/react';
import { ActorRefFrom } from 'xstate';

import { Images } from '@/entities/Images';
import { PossibleChanges } from '@/entities/History';
import { ImgyStoreMachine } from './useImgyStoreMachine';

export type SSRDataProps = {
    images: Images;
    possibleChanges: PossibleChanges;
}

type ImgyStoreProviderProps = {
  children: ReactNode;
}

export const ImgyStoreContext = createContext({
  imgyService: {} as ActorRefFrom<typeof ImgyStoreMachine>,
});

export const ImgyStoreProvider: FC<ImgyStoreProviderProps> = (props) => {
  const imgyService = useInterpret(ImgyStoreMachine);

  return (
    <ImgyStoreContext.Provider value={{ imgyService }}>
      {props.children}
    </ImgyStoreContext.Provider>
  );
};
