import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  BigContainer: {
    backgroundColor: '#fff',
    padding: 10,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  profileContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  profileItem: {
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 50,
  },
  profileItem1: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    width: '100%',
  },
  profile: {
    height: 120,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
  },
  image: {
    width: '25%',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  name: {
    width: '70%',
    justifyContent: 'center',
    marginTop: 5
  },
  nameName: {
    fontSize: 18,
    color: 'black',
    fontFamily: "Montserrat-Medium"
  },
  nameDesc: {
    fontSize: 12,
    color: 'black',
  },
  profileInfo: {
    padding: 20,
  },
  spText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  profileLink: {
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  texx: {
    width: '93%',
    textAlign: 'left',
  },
  itemInfoImage: {
    width: '100%',
    // justifyContent: 'flex-end',
    // alignItems: 'flex-end',
  },
  profileImg: {
    width: 20,
    height: 20,
  },
  userPassword: {
    padding: 20,
  },
  input: {
    marginTop: 10,
    marginLeft: 0,
    paddingBottom: 0,
    fontSize: 15,
    paddingLeft: 10,
    height: 50,
    backgroundColor: '#EFEFEF',
  },
  profilepasswordinput: {
    fontSize: 12,
  },
  passwordbtn: {
    marginTop: 20,
    backgroundColor: '#213b78',
    height: 50,
    width: '100%',
  },
  maskContainer: {
    marginTop: 10,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  maskError: {
    color: 'red',
  },
  fingerFooter: {
    padding: 20,
    marginTop: 10,
    position: 'absolute',
    bottom: '1%',
    width: '100%',
  },
  fingerbtn: {
    backgroundColor: '#213b78',
    height: 50,
    width: '100%',
  },
  fingerContainer: {
    padding: 20,
    alignItems: 'center',
  },
  fingerText1: {
    marginTop: '2%',
    marginBottom: '5%',
    fontSize: 14,
  },
  fingerText2: {
    marginTop: '7%',
    marginBottom: '5%',
    fontSize: 14,
  },
  bdayBG: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '30%',
  },
  bdaygift1: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 100,
    height: 100,
  },
  bdaygift2: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 100,
    height: 100,
  },
  bdayFooter: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: '1%',
    color: '#666666',
  },
  bday: {
    flexDirection: 'column',
  },
  Username: {
    color: 'red',
  },
  bdayClose: {
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bdayCake: {
    height: '30%',
    alignItems: 'center',
  },
  bdayText: {
    height: '40%',
    alignItems: 'center',
  },
  medalColor: {
    height: '15%',
    alignItems: 'center',
  },
  medalInfo: {
    height: '65%',
    alignItems: 'center',
  },
  medalNumber: {
    marginTop: 20,
    fontSize: 30,
    color: '#1660AB',
  },
  medalSubtext1: {
    marginTop: 10,
  },
  medalFooter: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: '1%',
    width: '100%',
    padding: 20,
  },
  medalbtn: {
    backgroundColor: '#213b78',
    height: 50,
    width: '100%',
  },
  buttonContainer: {
    paddingTop: 10,
    paddingHorizontal: 50,
  },
  singlebuttoncontainer: {
    borderRadius: 18,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4c669f',
  },
  linearGradient: {
    width: '100%',
    borderRadius: 16,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  logoutButton: {
    borderRadius: 180,
    height: 40,
    width: 40,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  logouticon: {
    color: '#4c669f',
  },
  listItemBigContainer: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  lictItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eee',
    padding: 12,
    marginBottom: 12,
  },
  listitemicon: {
    borderRadius: 160,
    borderWidth: 1,
    borderColor: 'rgba(213, 224, 255, 0.99)',
    padding: 8,
    color: 'rgba(74, 118, 243, 0.99)',
  },
  listitemmoreicon: {},
  listitembody: {
    flex: 6,
    paddingLeft: 15,
    zIndex: -2,
  },
  listitemorecontainer: {},
  listItemTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#666',
  },
  listItemSubtitle: {
    fontSize: 13,
    color: 'rgba(118, 118, 118, 1)',
    fontWeight: '500',
    marginTop: 3,
  },
  listItemBigTitle: {
    fontSize: 16,
    fontWeight: '700',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 14,
    paddingBottom: 8,
    borderLeftWidth: 8,
    borderLeftColor: '#eee',
    marginTop: 14,
    paddingLeft: 20,
    color: '#333',
  },
  bigcontainer: {
    padding: 20,
  },
  smallContainer: {
    padding: 20,
  },
  pageheader: {},
  pagetitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addressShowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 12,
    alignItems: 'center',
  },
  addressShowInput: {
    borderWidth: 1,
    borderColor: '#eee',
    width: '100%',
    padding: 8,
    borderRadius: 8,
    marginVertical: 12,
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
  },
  flex1: {
    flex: 1,
  },
  pr10: {
    paddingRight: 10,
  },
  addressShowField: {
    fontSize: 13,
    color: '#000',
  },
  addressShowAddress: {
    fontWeight: 'normal',
    lineHeight: 20,
  },
  addressEditButton: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#3b5998',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 12,
  },
  addressEditButtonTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  br12: {
    borderRadius: 12,
  },
  mt20: {
    marginTop: 20,
  },
  listitemiconedit: {
    color: '#eee',
  },
});
