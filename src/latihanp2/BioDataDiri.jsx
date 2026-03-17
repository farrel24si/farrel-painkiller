import React from 'react';
import "./custom.css";

const ProfilePicture = () => (
  <div className="profile-picture">👨‍💻</div>
);

const FullName = () => (
  <div className="name">
    <h1>Farrel Aditya Nugraha</h1>
    <p>Mahasiswa Sistem Informasi</p>
  </div>
);

const PersonalInfo = () => (
  <div className="info">
    <span>📅 18 Februari 2006</span>
    <span>👤 Laki-laki</span>
    <span>📍 Riau, Indonesia</span>
  </div>
);

const About = () => (
  <div className="section">
    <h3>Tentang Saya</h3>
    <p>
      Mahasiswa Sistem Informasi yang memiliki minat di bidang
      pengembangan web khususnya frontend dan UI/UX.
    </p>
  </div>
);

const Education = () => (
  <div className="section">
    <h3>Pendidikan</h3>
    <div className="card">
      <h4>Politeknik Caltex Riau</h4>
      <p>Sistem Informasi</p>
    </div>
  </div>
);

const Experience = () => (
  <div className="section">
    <h3>Pengalaman</h3>
    <div className="card">
      <h4>Aplikasi Laundry</h4>
      <p>CodeIgniter 4</p>
    </div>
    <div className="card">
      <h4>Aplikasi BinaDesa</h4>
      <p>Laravel</p>
    </div>
  </div>
);

const Skills = () => (
  <div className="section">
    <h3>Keterampilan</h3>
    <div className="skills">
      <span>HTML</span>
      <span>CSS</span>
      <span>JavaScript</span>
      <span>ReactJS</span>
      <span>PHP</span>
      <span>Laravel</span>
      <span>Git</span>
    </div>
  </div>
);

const Contact = () => (
  <div className="section">
    <h3>Kontak</h3>
    <p>📧 farrel24si@mahasiswa.pcr.ac.id</p>
    <p>📱 081378006129</p>
    <p>📍 Indonesia</p>
  </div>
);

const BiodataDiri = () => {
  return (
    <div className="container">
      <div className="header">
        <ProfilePicture />
        <FullName />
        <PersonalInfo />
      </div>

      <About />
      <Education />
      <Experience />
      <Skills />
      <Contact />
    </div>
  );
};

export default BiodataDiri;