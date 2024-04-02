import {StyleSheet} from 'react-native';
import {Colors} from '../../components/global/Colors';

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  tsalin: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  flex: {
    flex: 1,
  },
  tsalinjihRowText: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    color: '#000',
  },
  tsalinjihRowAmount: {
    textAlign: 'right',
    fontWeight: '700',
    color: '#000',
    width: '100%',
    flex: 1,
  },
  grayBg: {backgroundColor: '#eee'},
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: 200,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
    alignSelf: 'center',
    width: 100,
  },
  buttonSearch: {
    backgroundColor: Colors.primary,
  },
  buttonClose: {
    backgroundColor: '#ffba00',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTitle: {
    marginBottom: 15,
    alignSelf: 'center',
    textAlign: 'center',
    color: '#333',
  },
  modalFilterRow: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  selectContainer: {
    justifyContent: 'center',
  },
});
