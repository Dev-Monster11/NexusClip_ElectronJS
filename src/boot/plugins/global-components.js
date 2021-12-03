import { PageAtom } from "@/ui/components/atoms/page";

import { FlexLayout } from "@/ui/components/layouts/flex";
import { StackLayout } from "@/ui/components/layouts/stack";

export default ({ Vue }) => {
  Vue.component("PageAtom", PageAtom);

  Vue.component("FlexLayout", FlexLayout);
  Vue.component("StackLayout", StackLayout);
};
