import ColorPlayground from 'playgrounds/ColorPlayground.svelte';
import ScreenPlayground from 'playgrounds/ScreenPlayground.svelte';
import TaxPlayground from 'playgrounds/TaxPlayground.svelte';

const ROUTE_MAP = {
  color: ColorPlayground,
  screen: ScreenPlayground,
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
  name: 'screen',
  icon: 'display',
}, {
  name: 'tax',
  icon: 'money',
}];

export default ROUTE_MAP;
