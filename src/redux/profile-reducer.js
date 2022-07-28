import img from "../assets/profileImage.jpg";

let initialState = {
  profileName: 'Чуваков Алексей',
  profileImage: img
};

let ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default ProfileReducer;
