import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard({ user }) {
  const [profile, setProfile] = useState(null);
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState(null);
  const [newUsername, setNewUsername] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        //verify the user and get user info
        const response = await fetch('https://4800api.sdvxindex.com/api/verify', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        if (data.user) {
          const uid = data.user.user_id;
          setUserId(uid);
          setEmail(data.user.email);
          
          //fetch profile details using the user_id
          const profileResponse = await fetch(`https://4800api.sdvxindex.com/api/profiles/${uid}`, {
            method: 'GET',
            credentials: 'include',
          });
          const userProfile = await profileResponse.json();
          setProfile(userProfile);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleUsernameUpdate = async () => {
    if (!newUsername) {
      setMessage('Please enter a new username.');
      return;
    }
    try {
      const response = await fetch(`https://4800api.sdvxindex.com/api/profiles/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username: newUsername }),
      });
      const data = await response.json();
      if (data.success) {
        setProfile(data.profile);
        setMessage('Username updated successfully!');
      } else {
        setMessage('Failed to update username.');
      }
    } catch (error) {
      console.error('Error updating username:', error);
      setMessage('Error updating username.');
    }
  };

  const handleProfilePictureUpload = async () => {
    if (!selectedFile) {
      setMessage('Please select a file to upload.');
      return;
    }
    try {
      //upload the image first
      const formData = new FormData();
      formData.append('image', selectedFile);
      const uploadResponse = await fetch(`https://4800api.sdvxindex.com/api/upload-image`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
      const uploadData = await uploadResponse.json();
      if (!uploadData.success) {
        setMessage('Image upload failed.');
        return;
      }
      //now update the profile with the new image URL
      const response = await fetch(`https://4800api.sdvxindex.com/api/profiles/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ profile_picture: uploadData.url }),
      });
      const data = await response.json();
      if (data.success) {
        setProfile(data.profile);
        setMessage('Profile picture updated successfully!');
      } else {
        setMessage('Failed to update profile picture.');
      }
    } catch (error) {
      console.error('Error updating profile picture:', error);
      setMessage('Error updating profile picture.');
    }
  };

  //new logout function to clear the cookie and redirect to login
  const handleLogout = async () => {
    try {
      const response = await fetch('https://4800api.sdvxindex.com/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        //redirect to login page on successful logout
        navigate('/login');
      } else {
        setMessage('Logout failed.');
      }
    } catch (error) {
      console.error('Error logging out:', error);
      setMessage('Error logging out.');
    }
  };

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="dashboard-info">
          <h1>Welcome, {profile.nickname}</h1>
          <p>{email}</p>
        </div>
        <div className="dashboard-profile-picture">
          <img src={profile.profile_picture} alt="Profile" />
        </div>
        <div className="header-buttons">
          <button className="home-button" onClick={() => navigate('/home')}>
            Home
          </button>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>
      <main className="dashboard-main">
        <h2>Update Profile</h2>
        <div>
          <h3>Change Username</h3>
          <input
            type="text"
            placeholder="New username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <button className="update-button" onClick={handleUsernameUpdate}>
            Update Username
          </button>
        </div>
        <div>
          <h3>Change Profile Picture</h3>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
          <button className="update-button" onClick={handleProfilePictureUpload}>
            Upload New Profile Picture
          </button>
        </div>
        {message && <p>{message}</p>}
        <h2>Recently Watched Movies</h2>
        <div className="recently-watched">
          <div className="movie">
            <img
              src="https://play-lh.googleusercontent.com/7SYIHW3ymjuNe3EFC5htYqOSW1-w8DjM93ftyLi_LlzeNEVlY0HAp4YOT6crIbmYcfJwFZBT8AUBSK2go1C3"
              alt="Titanic"
            />
            <p>Titanic</p>
          </div>
          <div className="movie">
            <img
              src="https://m.media-amazon.com/images/I/514zBLkyJcL.jpg"
              alt="Interstellar"
            />
            <p>Interstellar</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
