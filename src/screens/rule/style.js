import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
  },
  item: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 10,
    elevation: 2,
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 12,
    color: '#666',
    width: '100%',
  },
  itemInfo: {
    marginTop: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    width: '90%',
  },
  itemInfoText: {
    width: '90%',
    fontSize: 14,
    color: '#444',
    fontWeight: 'bold',
  },
  itemInfoImage: {
    width: '10%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  //Filter
  filterContainer: {
    backgroundColor: '#1159a2',
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
    // height:'75%',
  },
  filterBtn: {
    width: '100%',
    paddingTop: 30,
    // height:'25%',
    // justifyContent:'flex-end'
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
    textAlignVertical: 'top',
    backgroundColor: '#fff',
    color: '#999',
    paddingTop: 15,
    width: '100%',
  },

  input1: {
    textAlignVertical: 'top',
    backgroundColor: '#fff',
    color: '#999',
    paddingLeft: 15,
    padding: 10,
    paddingTop: 15,
    height: 50,
  },

  labelTitle: {
    color: '#fff',
    fontSize: 13,
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
  ticketInput: {
    height: 40,
    // backgroundColor:'#fff',
    borderWidth: 1,
    borderColor: '#cecece',
    width: '100%',
    // fontSize: 12,
  },
});
