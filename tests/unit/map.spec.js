import { shallowMount } from '@vue/test-utils';
import Map from '@/components/Map.vue';
import { iss, mockFetch } from '../mock';

describe('Map', () => {
  const wrapper = shallowMount(Map);
  const { vm } = wrapper;

  test('renders the correct markup', () => {
    global.fetch = mockFetch({});
    expect(wrapper.html()).toContain('<div id="map"></div>');
    if (vm.error) {
      expect(vm.error.length).not.toBe(0);
      expect(wrapper.html()).toContain('<div class="error">');
    }
  });

  test('emits an event', () => {
    vm.$emit('iss');
    vm.$emit('iss', iss);
    expect(wrapper.emitted().iss).toBeTruthy();
    expect(wrapper.emitted().iss.length).toEqual(2);
    expect(wrapper.emitted().iss[1]).toEqual([iss]);
  });
});
