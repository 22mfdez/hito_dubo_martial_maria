const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const session = require('express-session');
const passport = require("passport");
const cookieParser = require('cookie-parser');
const LocalStrategy = require('passport-local').Strategy;



const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());



// LOCAL PASSPORT:
passport.use(new LocalStrategy({
  usernameField: 'username', // ajusta esto según el nombre de tu campo de usuario en el formulario
  passwordField: 'password'  // ajusta esto según el nombre de tu campo de contraseña en el formulario
}, (username, password, done) => {
  // Lógica de verificación de usuario y contraseña
  // Debes buscar el usuario en tu base de datos y verificar la contraseña aquí
}));



app.use(session({
  secret: '125455',
  resave: false,
  saveUninitialized: false,
}));


app.use(passport.initialize());
app.use(passport.session());

app.post("/login", passport.authenticate("local"), (req, res) => {
  const token = jwt.sign({ user: req.user.username }, "123456789");

  // Almacenar información del usuario en la sesión
  req.session.userInfo = {
    username: req.user.username,
    email: req.user.email,
    
  };

  res.json({ token, message: "Inicio de sesión exitoso" });
});



app.post("/register", async (req, res) => {
  const { username, nombre, apellido, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).send("El nombre de usuario ya está registrado");
    }

    const newUser = new User({
      username,
      nombre,
      apellido,
      email,
      password,
    });

    await newUser.save();

    res.status(201).send("Usuario registrado correctamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en el servidor");
  }
});

// Ruta protegida, solo accesible si el usuario está autenticado
app.get("/perfil", ensureAuthenticated, (req, res) => {
  res.sendFile(__dirname + "/perfil.html");
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send("Acceso no autorizado");
}

app.use(session({
  secret: '123456789', // Cambia esto a una cadena secreta más segura
  resave: false,
  saveUninitialized: false,
}));

//CONEX. A MOONGO Y SCHEMA
mongoose.connect("mongodb+srv://maria:1234@cluster0.nqgxkqm.mongodb.net/hito", {
  useNewUrlParser: true, // Elimina esta línea, ya no es necesaria
  useUnifiedTopology: true,
})

  .then(() => {
    console.log('Conexión exitosa a MongoDB Atlas');
  })
  .catch((error) => {
    console.log('Error de conexión', error);
  });

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, async (username, password, done) => {
  try {
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return done(null, false, { message: 'Credenciales incorrectas' });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});






// CONFIGURA LOGIN
app.post("/login", passport.authenticate("local"), (req, res) => {
  // Generar el token
  const token = jwt.sign({ user: req.user.username }, "tu_secreto");

  // Enviar el token al cliente
  res.json({ token, message: "Inicio de sesión exitoso" });
});


//PERFIL HTML

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send("Acceso no autorizado");
}

app.get("/perfil", ensureAuthenticated, (req, res) => {
  // Código para la ruta de perfil
  res.sendFile(__dirname + "/perfil.html");
});




app.post("/register", async (req, res) => {
  const { username, nombre, apellido, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).send("El nombre de usuario ya está registrado");
    }

    const newUser = new User({
      username,
      nombre,
      apellido,
      email,
      password,
    });

    await newUser.save();

    res.status(201).send("Usuario registrado correctamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en el servidor");
  }
});


app.listen(port, () => {
  console.log(`La aplicación se inició correctamente en el puerto ${port}`);
});
