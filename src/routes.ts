import ColorPlayground from 'playgrounds/ColorPlayground';
import Fylvur from 'playgrounds/Fylvur';
import HotPlayground from 'playgrounds/HotPlayground.svelte';
import TaxPlayground from 'playgrounds/TaxPlayground.svelte';

const ROUTE_MAP = {
  color: ColorPlayground,
  hot: HotPlayground,
  tax: TaxPlayground,
  fylvur: Fylvur,
};

export type RouteKey = keyof typeof ROUTE_MAP;

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
}, {
  name: 'fylvur',
  icon: 'hdd',
}];

export default ROUTE_MAP;
