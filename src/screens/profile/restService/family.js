import api from './../../../api/localApi';

export function ShowFamily(jwt, id) {
  return new Promise((resolve, reject) => {
    api
      .get(`/ViewFamilyMember?jwt=${jwt}&dmember=${id}`)
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

export function InsertFamily(jwt, data) {
  return new Promise((resolve, reject) => {
    api
      .get(
        `/AddFamilyMember?jwt=${jwt}&name=${data.name}&contact_number=${data.contactNumber}&date_of_birth=${data.dateOfBirth}&organization=${data.organization}&registry_number=${data.registryNumber}&job_position=${data.jobPosition}&relation_name=${data.relationName}&dropdown_list_id=${data.dropdownListId}`,
      )
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

export function UpdateFamily(jwt, data, id) {
  return new Promise((resolve, reject) => {
    api
      .put(
        `/EditFamilyMember?dmember=${id}&jwt=${jwt}&name=${data.name}&contact_number=${data.contactNumber}&date_of_birth=${data.dateOfBirth}&organization=${data.organization}&registry_number=${data.registryNumber}&job_position=${data.jobPosition}&relation_name=${data.relationName}&dropdown_list_id=${data.dropdownListId}`,
      )
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

export function DropFamily(jwt, id) {
  return new Promise((resolve, reject) => {
    api
      .delete(`/DeleteFamilyMember?jwt=${jwt}&dmember=${id}`)
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

export function FamilyList(jwt) {
  return new Promise((resolve, reject) => {
    api
      .get('/ViewAllFamilyMembers', {
        params: {
          jwt: jwt,
        },
      })
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

module.exports = {
  ShowFamily,
  InsertFamily,
  UpdateFamily,
  DropFamily,
  FamilyList,
};
