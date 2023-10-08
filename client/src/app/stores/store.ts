import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commonsStore";
import UseStore from "./userStore";
import ModelStore from "./modelStore";
import ProfileStore from "./profileStore";

interface Store {
  activityStore: ActivityStore;
  commonStore: CommonStore;
  userStore: UseStore;
  modelStore: ModelStore;
  profileStore: ProfileStore;
}

export const store: Store = {
  activityStore: new ActivityStore(),
  commonStore: new CommonStore(),
  userStore: new UseStore(),
  modelStore: new ModelStore(),
  profileStore: new ProfileStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
