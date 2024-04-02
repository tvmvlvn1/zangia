import api from './../../../api/localApi';

export function GetResult(jwt) {
  return new Promise((resolve, reject) => {
    api
      .get(`/GetResult?jwt=${jwt}`)
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

export function ChangePhone(jwt, phone) {
  return new Promise((resolve, reject) => {
    api
      .put(`/ChangePhoneApp?jwt=${jwt}&personal_phone=${phone}`)
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

export function DeletePhone(jwt) {
  return new Promise((resolve, reject) => {
    api
      .delete(`/DeletePhoneApp?jwt=${jwt}`)
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

export function ChangeEmmergency(jwt, name, phone) {
  return new Promise((resolve, reject) => {
    api
      .put(
        `/AddEmmergencyPhone?jwt=${jwt}&rel_person_name=${name}&rel_person_phone=${phone}`,
      )
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

export function DeleteEmmergency(jwt) {
  return new Promise((resolve, reject) => {
    api
      .delete(`/DeleteEmmergencyPhone?jwt=${jwt}`)
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

export function ChangeIbdNumber(jwt, ibd_number) {
  return new Promise((resolve, reject) => {
    api
      .put(`/changeIbdNumberApp`, {jwt, ibd_number})
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

module.exports = {
  GetResult,
  ChangePhone,
  DeletePhone,
  ChangeEmmergency,
  DeleteEmmergency,
  ChangeIbdNumber,
};
