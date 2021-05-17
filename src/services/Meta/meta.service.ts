import axiosInstance from "../../interceptor/axiosInstance";
import { ApiRoutes } from "../../routes/routeConstants/apiRoutes";
import { ReactNode } from "react";

export interface IDropdownOption {
  label?: string;
  value?: string | number;
  optionalLabel?: string | ReactNode;
}

export class MetaService {
  static fetchFactions(
    onSuccess: Function,
    onError: Function,
    onFinal: () => void
  ) {
    axiosInstance
      .get(ApiRoutes.FACTIONS)
      .then((response) => {
        onSuccess(response.data as string[]);
      })
      .catch((error) => {
        onError();
      })
      .finally(() => {
        onFinal();
      });
  }
}
