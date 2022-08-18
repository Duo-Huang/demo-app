import { ActionContext } from 'vuex';

export const createActionContext = <S, R>(
  injectee: Partial<ActionContext<S, R>>
): ActionContext<S, R> => {
  return {
    dispatch: async (type: string, payload?: any) => {},
    commit: (type: string, payload?: any) => {},
    state: {} as S,
    getters: {},
    rootState: {} as R,
    rootGetters: {},
    ...injectee,
  };
};
