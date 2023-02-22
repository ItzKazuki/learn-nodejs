# Backend Nodejs

Backend Nodejs adalah sebuah server yang dijalankan agar pengggunaan beban server lebih ringan, karena jika backend dan frontend di satukan akan membuat beban server lebih berat. jadi kita bisa menaruh di tempat yang berbeda (contohnya di domain api.ex-server.co merupakan backend menggunakan azure, dan di ex-server.co adalah frontend yang sudah di intergrasikan backend menggunakan aws, ex-server.co akan tetap bekerja walaupun di tempat/domain yang berbeda)

# Filtur
* Authentication (register, login, dll)
* Authorization (role/permission: user, moderator, atau admin)
* user profile

# Package yang digunakan
- [JWT](https://jwt.io) (JSON Web Token)
- [nodemailer]() (for send email)
- [express.js](https://expressjs.com) (for start server)
- [sequelize]() (for connect to databases)
# API Reference

### Authentication

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `x-access-token` | `string` | **Required**. Your token from `/api/auth/signin` |

#### Login & Register

```http
  GET /api/auth/signin
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. Your username |
| `email` | `string` | **Required**. Your email |
| `password` | `string` | **Required**. Your password |

```http
  GET /api/auth/signup
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. Your username |
| `email` | `string` | **Required**. Your email |
| `password` | `string` | **Required**. Your password |

### User Profile

```http
  GET /api/user/profile
```
hanya butuh Authentication

# Terimakasih Untuk
* saya sendiri ziziziiziiz

### bug report
jika ada bug atau masalah, buka saja issues, atau email saya di contact@kazukikunn.xyz


