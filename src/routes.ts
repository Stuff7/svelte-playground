import ColorPlayground from 'playgrounds/ColorPlayground';
import HotPlayground from 'playgrounds/HotPlayground.svelte';
import TaxPlayground from 'playgrounds/TaxPlayground.svelte';

const ROUTE_MAP = {
  color: ColorPlayground,
  hot: HotPlayground,
  tax: TaxPlayground,
};

interface Route {
  name: keyof typeof ROUTE_MAP;
  icon: IconName;
}

export const routes: Route[] = [{
  name: 'color',
  icon: 'brush',
}, {
  name: 'hot',
  icon: 'fire',
}, {
  name: 'tax',
  icon: 'money',
}];

export default ROUTE_MAP;
