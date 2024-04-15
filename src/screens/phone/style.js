import {StyleSheet} from 'react-native';
import { blue700 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import {Colors} from '../../components/global/Colors';

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  phoneListHeader: {
    backgroundColor: '#0858A3',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 250, 250, 0.2)',
  },
  phoneListHeaderBtn: {
    width: '100%',
    backgroundColor: 'transparent',
    borderColor: '#4d83b9',
    borderWidth: 1,
    borderRadius: 5,
  },
  phoneListHeaderText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
  },
  item: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  phoneName: {
    padding: 15,
    width: '80%',
    flexDirection: 'column',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  phoneAction: {
    width: '20%',
    borderLeftColor: '#eee',
    borderLeftWidth: 1,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneNameName: {
    fontSize: 16,
    color: '#444444',
    fontFamily: "Montserrat-Regular"
  },
  phoneNameJob: {
    fontSize: 12,
    color: '#4c4c4c',
    fontFamily: "Montserrat-Medium"
  },
  phoneDownload: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0858A3',
    height: 70,
  },
  phoneDownloadTwo: {
    width: '78%',
  },
  phoneDownloadTwoTitle: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'left',
    padding: 17,
  },
  phoneDownloadThree: {
    width: '10%',
    justifyContent: 'center',
  },
  phoneDownloadThreeImage: {
    width: 20,
    height: 20,
  },
  downloadList: {
    flexDirection: 'column',
    flex: 1,
  },
  downloadListList: {
    height: '85%',
  },
  downloadListBtn: {
    flexGrow: 1,
    padding: 15,
  },
  downloadListBtnInner: {
    alignSelf: 'center',
    bottom: 25,
    position: 'absolute',
    backgroundColor: '#0858A3',
    borderRadius: 10,
    width: '100%',
  },
  downloadListBtnInnerText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    padding: 10,
  },
  filterContainer: {
    backgroundColor: '#1159a2',
    flex: 1,
  },
  filterBoard: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    backgroundColor: '#1159a2',
    padding: 10,
  },
  filterTool: {
    width: '100%',
  },
  filterBtn: {
    width: '100%',
    paddingTop: 30,
    // height: '25%',
    // justifyContent: 'flex-end'
  },
  filterBtnSearch: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  filterBtnSearchText: {
    color: '#1159a2',
    fontSize: 16,
    textAlign: 'center',
    padding: 12,
  },
  dropDown: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#fff",

  },
  filterBtnSearchClear: {
    marginTop: 10,
    width: '100%',
    backgroundColor: 'transparent',
    borderColor: '#4d83b9',
    borderWidth: 1,
    borderRadius: 5,
  },
  filterBtnSearchClearText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    padding: 12,
  },
  input: {
    marginTop: 5,
    textAlignVertical: 'top',
    backgroundColor: '#2668aa',
    color: '#fff',
    height: 90,
    padding: 10,
  },
  labelTitle: {
    color: '#fff',
    fontSize: 15,
  },
  autocompleteContainer: {
    backgroundColor: '#296aab',
    padding: 0,
    margin: 0,
    borderWidth: 0,
    width: '100%',
  },

  itemText: {
    fontSize: 15,
    paddingBottom: 5,
  },

  //Filter result
  resultHeader: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  resultHeaderInfo: {
    width: '80%',
    flexDirection: 'row',
    padding: 20,
  },

  resultHeaderImage: {
    width: '20%',
    alignItems: 'flex-end',
    padding: 20,
  },
  phoneDetails: {
    borderBottomWidth: 0.7,
    borderColor: '#ccc',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  phoneDetailsText: {color: '#999'},
  phoneDetailsInfo: {color: '#000'},

  button: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginHorizontal: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {color: '#fff'},
});
