import { shallowMount } from '@vue/test-utils';
import Main from '@/components/Main.vue';
import Map from '@/components/Map.vue';
import { iss } from '../mock';

describe('Main', () => {
  const wrapper = shallowMount(Main);
  const { vm } = wrapper;

  it('realtime value changes on button click', () => {
    expect(Main.data().realtime).toBeTruthy();
    wrapper.find('button').trigger('click');
    expect(wrapper.find('button').element.classList).toContain('realtime');
    expect(vm.realtime).toBeFalsy();
    wrapper.find('button').trigger('click');
    expect(vm.realtime).toBeTruthy();
  });

  it('center value changes on input selected', () => {
    const input = wrapper.find('input');
    expect(Main.data().center).toBeTruthy();
    input.setChecked(false);
    expect(vm.center).toBeFalsy();
    input.trigger('click');
    expect(vm.center).toBeTruthy();
  });

  it('displays correct iss data', () => {
    expect(wrapper.html()).not.toContain('Latitude');
    expect(wrapper.html()).not.toContain('Longitude');
    expect(wrapper.html()).not.toContain('Altitude');
    wrapper.find(Map).vm.$emit('iss', iss);
    expect(vm.iss).toEqual(iss);
    expect(wrapper.html()).toContain('Latitude');
    expect(wrapper.html()).toContain('Longitude');
    expect(wrapper.html()).toContain('Altitude');
  });
});
