import React from 'react'
import Layout from '../components/Layout';
import { Tabs, message } from "antd";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import {showLoading, hideLoading} from '../redux/features/alertSlice'
import axios from 'axios';
const NotificationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector(state => state.user)
  //Read notification
  const handleMarkAllRead = async() => {
    let res;
    try{
      dispatch(showLoading())
      const res = await axios.post(
        "/api/v1/user/get-all-notification",
         {
          userId: user._id,
        },
      {
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
      );
      if (res.data.success) {
        dispatch(hideLoading()); // Moved this line
        message.success(res.data.message);
      } else {
        dispatch(hideLoading()); // Moved this line
        message.error(res.data.message);
      }
    }catch(error){
      dispatch(hideLoading())
      if(res.data.success){
        message.success(res.data.message)
      }else{
        message.error(res.data.message)
      }
      console.log(error)
      message.error("Something went wrong!")
    }
  };
  //delete notification
  const handleDeleteAllRead = async() => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/delete-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Somthing Went Wrong In Ntifications");
    }
  };
  
  return (
    <Layout>
      <h4 className="p-3 text=center">NotificationPage</h4>
      <Tabs>
        <Tabs.TabPane tab="UnRead" key={0}>
          <div className="d-flex justify-content-end">
            <h4 className='p-2' onClick={handleMarkAllRead}>Mark All Read</h4>
          </div>
          {user?.notification && user.notification.map((notificationMgs) => (
            <div className="card" style={{ cursor: "pointer" }} key={notificationMgs.id}>
            <div
              className="card-text"
              onClick={() => navigate(notificationMgs.onClickPath)}>
            <div className="card-text">{notificationMgs.message}</div>
         </div>
      </div>
    ))}

        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key={1}>
          <div className="d-flex justify-content-end">
            <h4 className="p-2 text-primary" style={{ cursor: "pointer"}} onClick={handleDeleteAllRead}>
              Delete All Read
              </h4>
          </div>
          {user?.seennotification && user.notification.map((notificationMgs) => (
            <div className="card" style={{ cursor: "pointer" }} key={notificationMgs.id}>
            <div
              className="card-text"
              onClick={() => navigate(notificationMgs.onClickPath)}>
            <div className="card-text">{notificationMgs.message}</div>
        </div>
      </div>
      ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  )

}
export default NotificationPage