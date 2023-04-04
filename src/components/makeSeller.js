import React, { useState } from 'react';
import axios from 'axios';

const MakeSellerButton = (props) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);
const {userDetails}=props;
const {MakeSeller}=props;


  const handleUpdateSeller = async () => {
    setIsUpdating(true);
    setUpdateError(null);

    try {
     const userDet=userDetails;
     console.log(userDet)
     const user=(userDet[0])

     const result = window.confirm("Are you sure you want to become a seller?");
       if (result) {
       MakeSeller(user.id);
      }

     setIsUpdating(false);
    } catch (error) {
      console.error(error);
      setUpdateError('An error occurred while updating user seller status.');
      setIsUpdating(false);
    }
  };

  return (
    <button onClick={handleUpdateSeller} disabled={isUpdating} className='btn btn-success mb-3'>
      {isUpdating ? 'Updating...' : 'Become Seller'}
      {updateError && <div className="error">{updateError}</div>}
    </button>
  );
};

export default MakeSellerButton;
