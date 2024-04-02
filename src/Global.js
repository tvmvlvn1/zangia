import AsyncStorage from '@react-native-async-storage/async-storage';
AsyncStorage.getItem('info').then(req => {
  let userArray = JSON.parse(req);

  if (userArray != null) {
    user.name = userArray.name;
    user.lname = userArray.lname;
    user.token = userArray.token;
    user.job = userArray.job;
    user.department = userArray.department;
    user.img = userArray.img;
    user.phone = userArray.phone;
    user.mobile = userArray.workPhone;
    user.email = userArray.email;
    user.job_id = userArray.job_id;
    user.dep_id = userArray.dep_id;
    user.emp_id = userArray.emp_id;
    user.dep_map = userArray.dep_map;
    user.identify = userArray.identify;
    user.identify_url = userArray.identify_url;
    user.fingercode = userArray.fingercode;
    user.imei = userArray.imei;
    user.modules = userArray.modules;
    user.sector = userArray.sector;
    user.restockCount = userArray.restockCount;
  }
});

export const user = {
  name: '',
  lname: '',
  department: '',
  job: '',
  img: '',
  token: '',
  email: '',
  phone: '',
  dep_id: '',
  job_id: '',
  emp_id: '',
  register: '',
  cardDate: '',
  cardNumber: '',
  dep_map: [],
  phone_contacts: [],
  identify: '',
  identify_url: '',
  fingercode: '',
  imei: '',
  modules: [],
  restockCount: '',
  sector: '',
};

export const config = {
  service_url: 'https://local.nomin.mn',
};

export const TimeSheet = () => {
  this.props.navigation.navigate('TimeSheet');
};
export const Salary = () => {
  this.props.navigation.navigate('Salary');
};
export const Home = () => {
  this.props.navigation.navigate('Home');
};
export const Phone = () => {
  this.props.navigation.navigate('Phone');
};

export const PhoneDetail = phone => {
  this.props.navigation.navigate('PhoneDetail');
};

export const UserDetail = () => {
  this.props.navigation.navigate('UserDetail');
};

export const userLogout = async () => {
  try {
    AsyncStorage.removeItem('id_token');
    AsyncStorage.removeItem('info');
    AsyncStorage.removeItem('locationInfo');
    this.props.navigation.navigate('UserDetail');
  } catch (error) {
    Alert.alert('Алдаа гарлаа', error.message);
  }
};

export const getCurrentDate = () => {
  var now = new Date();
  var pretty = [
    now.getFullYear(),
    '-',
    ('0' + (now.getMonth() + 1)).slice(-2),
    '-',
    now.getDate(),
    ' ',
    now.getHours(),
    ':',
    now.getMinutes(),
    ':',
    now.getSeconds(),
  ].join('');
  return pretty;
};

export function isEmpty(obj) {
  // null and undefined are "empty"
  if (obj == null) return true;

  // Assume if it has a length property with a non-zero value
  // that that property is correct.
  if (obj.length > 0) return false;
  if (obj.length === 0) return true;

  // If it isn't an object at this point
  // it is empty, but it can't be anything *but* empty
  // Is it empty?  Depends on your application.
  if (typeof obj !== 'object') return true;

  // Otherwise, does it have any properties of its own?
  // Note that this doesn't handle
  // toString and valueOf enumeration bugs in IE < 9
  for (var key in obj) {
    if (hasOwnProperty.call(obj, key)) return false;
  }

  return true;
}

export const familyOptions = [
  {value: '1', label: 'Ах'},
  {value: '2', label: 'Эгч'},
  {value: '3', label: 'Эхнэр'},
  {value: '4', label: 'Нөхөр'},
  {value: '11', label: 'Эмээ'},
  {value: '12', label: 'Өвөө'},
  {value: '13', label: 'Хүргэн'},
  {value: '14', label: 'Бэр'},
  {value: '15', label: 'Хадам аав'},
  {value: '16', label: 'Хадам ээж'},
  {value: '17', label: 'Хүү'},
  {value: '18', label: 'Охин'},
  {value: '19', label: 'Дүү'},
  {value: '20', label: 'Өөрөө'},
  {value: '24', label: 'Эцэг'},
  {value: '25', label: 'Эх'},
];

export const regs = [
  {value: 'А', label: 'А'},
  {value: 'Б', label: 'Б'},
  {value: 'В', label: 'В'},
  {value: 'Г', label: 'Г'},
  {value: 'Д', label: 'Д'},
  {value: 'Е', label: 'Е'},
  {value: 'Ё', label: 'Ё'},
  {value: 'Ж', label: 'Ж'},
  {value: 'З', label: 'З'},
  {value: 'И', label: 'И'},
  {value: 'Й', label: 'Й'},
  {value: 'К', label: 'К'},
  {value: 'Л', label: 'Л'},
  {value: 'М', label: 'М'},
  {value: 'Н', label: 'Н'},
  {value: 'О', label: 'О'},
  {value: 'Ө', label: 'Ө'},
  {value: 'П', label: 'П'},
  {value: 'Р', label: 'Р'},
  {value: 'С', label: 'С'},
  {value: 'Т', label: 'Т'},
  {value: 'У', label: 'У'},
  {value: 'Ү', label: 'Ү'},
  {value: 'Ф', label: 'Ф'},
  {value: 'Х', label: 'Х'},
  {value: 'Ц', label: 'Ц'},
  {value: 'Ч', label: 'Ч'},
  {value: 'Ш', label: 'Ш'},
  {value: 'Щ', label: 'Щ'},
  {value: 'Ъ', label: 'Ъ'},
  {value: 'Ы', label: 'Ы'},
  {value: 'Ь', label: 'Ь'},
  {value: 'Э', label: 'Э'},
  {value: 'Ю', label: 'Ю'},
  {value: 'Я', label: 'Я'},
];

export const monthOptions = [
  {value: '1', label: '1-сар'},
  {value: '2', label: '2-сар'},
  {value: '3', label: '3-сар'},
  {value: '4', label: '4-сар'},
  {value: '5', label: '5-сар'},
  {value: '6', label: '6-сар'},
  {value: '7', label: '7-сар'},
  {value: '8', label: '8-сар'},
  {value: '9', label: '9-сар'},
  {value: '10', label: '10-сар'},
  {value: '11', label: '11-сар'},
  {value: '12', label: '12-сар'},
];
