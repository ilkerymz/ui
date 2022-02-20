import Calibration from '../components/Calibration';
import NavigationMap from '../components/Map';
import DummyDataChart from '../components/MultiChannelChart/DummyDataChart';
import RosConnection from '../components/RosConnection';
import RosMessagePublisher from '../components/RosMessagePublisher';
import RostopicEcho from '../components/RostopicEcho';
import RostopicList from '../components/RostopicList';
import { RoverRotation } from '../components/RoverRotation';
import FossilTable from '../components/ScienceTables/FossilTable';
import SpeedChart from '../components/SpeedChart';
import Stopwatch from '../components/Stopwatch';
import Time from '../components/Time';
import UrdfVisualizer from '../components/UrdfVisualizer';

import withPluginData from '../containers/withPluginData';
import { PLUGIN_DATA_KEYS } from '../contexts/PluginsData';

// title is used for key as well, make sure it is uniqe.

export const PLUGINS = {
  UTC: { title: 'UTC', component: Time },
  MISSION_ELAPSED_TIME: {
    title: 'Mission Elapsed Time',
    component: withPluginData(Stopwatch, PLUGIN_DATA_KEYS.STOPWATCH)
  },
  BATTERY_STATUS: { title: 'Battery Status' },
  ROVER_NAVCAM_1: { title: 'Rover Navcam 1' },
  ROVER_NAVCAM_2: { title: 'Rover Navcam 2' },
  BATTERY_VOLTAGE: { title: 'Battery Voltage' },
  OPERATIONS: { title: 'Operations' },
  BATTERY_CURRENT: { title: 'Battery Current' },
  BATTERY_TEMPERATURE: { title: 'Battery Temperature' },
  BATTERY_CHARGE: { title: 'Battery State of Charge' },
  ORIENTATION: { title: 'Orientation', component: RoverRotation },
  URDF: { title: 'URDF', component: UrdfVisualizer, fixed: true },
  ROS_CONNECTION: { title: 'Ros Connection Status ', component: RosConnection },
  CALIBRATION: { title: 'Calibration', component: Calibration },
  ROSTOPIC_ECHO: {
    title: 'Rostopic Echo',
    component: withPluginData(RostopicEcho, PLUGIN_DATA_KEYS.ROSTOPIC_ECHO)
  },
  ROSTOPIC_LIST: {
    title: 'Rostopic List',
    component: RostopicList,
    fixed: true
  },
  MAP: { title: 'Map', component: NavigationMap, fixed: true },
  MESSAGE_PUBLISHER: {
    title: 'ROS Message Publisher',
    component: RosMessagePublisher
  },
  SPEED_CHART: { title: 'Speed (/wheel_odom)', component: SpeedChart },
  FOSSIL_TABLE: { title: 'Fossils', component: FossilTable, fixed: true },
  MULTICHANNEL_CHART: {
    title: 'Multi-Channel Chart',
    component: DummyDataChart
  }
};

export const MAIN_LAYOUT = [
  { plugin: PLUGINS.UTC, layout: { x: 0, y: 0, w: 1, h: 2 } },
  { plugin: PLUGINS.MISSION_ELAPSED_TIME, layout: { x: 1, y: 0, w: 2, h: 2 } },
  { plugin: PLUGINS.ORIENTATION, layout: { x: 3, y: 0, w: 4, h: 9 } },
  { plugin: PLUGINS.URDF, layout: { x: 7, y: 0, w: 5, h: 9 } },
  { plugin: PLUGINS.ROS_CONNECTION, layout: { x: 0, y: 2, w: 3, h: 2 } },
  { plugin: PLUGINS.ROSTOPIC_ECHO, layout: { x: 0, y: 3, w: 3, h: 9 } },
  { plugin: PLUGINS.CALIBRATION, layout: { x: 0, y: 3, w: 3, h: 5 } },
  { plugin: PLUGINS.ROSTOPIC_LIST, layout: { x: 3, y: 0, w: 4, h: 9 } },
  { plugin: PLUGINS.MAP, layout: { x: 7, y: 0, w: 5, h: 9 } },
  { plugin: PLUGINS.SPEED_CHART, layout: { x: 7, y: 0, w: 5, h: 7 } },
  { plugin: PLUGINS.MESSAGE_PUBLISHER, layout: { x: 7, y: 0, w: 2, h: 3 } },
  { plugin: PLUGINS.MULTICHANNEL_CHART, layout: { x: 0, y: 6, w: 7, h: 13 } },
];

export const NAVIGATION_LAYOUT = [
  { plugin: PLUGINS.UTC, layout: { x: 0, y: 0, w: 1, h: 2 } },
  { plugin: PLUGINS.MISSION_ELAPSED_TIME, layout: { x: 1, y: 0, w: 2, h: 2 } },
  { plugin: PLUGINS.ORIENTATION, layout: { x: 3, y: 0, w: 4, h: 9 } },
  { plugin: PLUGINS.MAP, layout: { x: 7, y: 0, w: 5, h: 9 } },
  { plugin: PLUGINS.ROS_CONNECTION, layout: { x: 0, y: 2, w: 3, h: 2 } },
  { plugin: PLUGINS.ROSTOPIC_ECHO, layout: { x: 0, y: 3, w: 3, h: 9 } },
  { plugin: PLUGINS.MESSAGE_PUBLISHER, layout: { x: 0, y: 6, w: 3, h: 3 } },
  { plugin: PLUGINS.SPEED_CHART, layout: { x: 3, y: 9, w: 6, h: 7 } },
];

export const SCIENCE_LAYOUT = [
  { plugin: PLUGINS.UTC, layout: { x: 0, y: 0, w: 1, h: 2 } },
  { plugin: PLUGINS.MISSION_ELAPSED_TIME, layout: { x: 1, y: 0, w: 2, h: 2 } },
  { plugin: PLUGINS.MAP, layout: { x: 7, y: 0, w: 5, h: 9 } },
  { plugin: PLUGINS.MULTICHANNEL_CHART, layout: { x: 0, y: 6, w: 7, h: 13 } },
  { plugin: PLUGINS.FOSSIL_TABLE, layout: { x: 0, y: 10, w: 10, h: 13 } }
];
