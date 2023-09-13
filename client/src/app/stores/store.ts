import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commonsStore";
import UseStore from "./userStore";
import ModelStore from "./modelStore";

interface Store {
  activityStore: ActivityStore;
  commonStore: CommonStore;
  userStore: UseStore;
  modelStore: ModelStore;
}

export const store: Store = {
  activityStore: new ActivityStore(),
  commonStore: new CommonStore(),
  userStore: new UseStore(),
  modelStore: new ModelStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
