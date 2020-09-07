import Button from './Button';
import ButtonMulti from './ButtonMulti';
import ButtonGroup from './ButtonGroup';
import Loader from './Loader';
import Seperator from './Seperator';
import Checkbox from './Checkbox';
import Text from './Text';
import TextInput from './TextInput';
import Picker from './Picker';
import DateTime from './DateTime';
import Map from './Map';
import Image from './Image';
import Header from './Header';
import Badge from './Badge';
import HView from './HView';
import Modal from './Modal';
import Carousel from './Carousel';
import ImageCarousel from './ImageCarousel';
import ImageViewer from './ImageViewer';
import Alert from './Alert';
import Container from './Container';
import Chat from './Chat';
import Switch from './Switch';
import ProfileBar from './Profile';
import {log} from './funcs';

class Nuno {
  static init(props) {
    log('Nuno Init', props);
    Nuno.config = {
      themeColor: props.themeColor,
      textColor: props.textColor,
      headerTitleWeight: props.headerTitleWeight,
      dynamicLink: props.dynamicLink,
      lang: props.lang,
      FIREBASE_WEB_API: props.FIREBASE_WEB_API,
      IOS_STORE_ID: props.IOS_STORE_ID,
      PACKAGE_NAME: props.PACKAGE_NAME,
      BUNDLE_ID: props.BUNDLE_ID,
      GEOCODE_API: props.GEOCODE_API,
      ...props,
    }
  }
}
export {
  Nuno,
  Button,
  ButtonMulti,
  ButtonGroup,
  Loader,
  Seperator,
  Checkbox,
  Text,
  TextInput,
  Picker,
  DateTime,
  Map,
  Image,
  Header,
  Badge,
  HView,
  Modal,
  Carousel,
  ImageCarousel,
  ImageViewer,
  Alert,
  Container,
  Chat,
  Switch,
  ProfileBar,
};