// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'io.framework7.testapp', // App bundle ID
  name: 'Framework7', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
      products: [
        {
          id: '1',
          title: 'Grupo 1',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis.'
        },
        {
          id: '2',
          title: 'Grupo 2',
          description: 'Velit odit autem modi saepe ratione totam minus, aperiam, labore quia provident temporibus quasi est ut aliquid blanditiis beatae suscipit odio vel! Nostrum porro sunt sint eveniet maiores, dolorem itaque!'
        },
        {
          id: '3',
          title: 'Grupo 3',
          description: 'Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.'
        },
      ]
    };
  },
  // App root methods
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  // App routes
  routes: routes,
  // Enable panel left visibility breakpoint
  panel: {
    leftBreakpoint: 960,
  },
  on: {
    pagenit: function () {
      console.log('App initialized');
      app.loginScreen.open('#my-login-screen');
    }
  }
});

// Init/Create left panel view
var mainView = app.views.create('.view-left', {
  url: '/'
});

// Init/Create main view
var mainView = app.views.create('.view-main', {
  url: '/'
});

// Login Screen Demo
$$('#my-login-screen .login-button').on('click', function () {
  var username = $$('#my-login-screen [name="username"]').val();
  var password = $$('#my-login-screen [name="password"]').val();

/*   app.request.json('https://login', function (data) {
    console.log(data);
    if (data.success) {

    } else {
      
    }
  }); */

  // Close login screen
  app.loginScreen.close('#my-login-screen');
  
});

$$('#my-login-screen .signin-button').on('click', function () {

  app.request.setup({
    contentType: 'application/json',
    headers: {
      'X-Auth-Token': '42cf53ee-a2f7-458b-99d2-5577e540884b'
    },
    dataType: 'json'
  });

  app.request.get('http://159.65.81.55/user/3/groups', 
  function (data) {
    // console.log(data, JSON.stringify(data));
    app.data.products = JSON.parse(data);
    // console.log(products);
  
  },
  function (error) {
    console.log('error');
  });

  var formData = app.form.convertToData('#user-form');
  // alert(JSON.stringify(formData));
  console.log('signup --> ', formData);
});

$$('#getDataTest').on('click', function () {
  app.request.json('https://jsonplaceholder.typicode.com/posts/1', function (data) {
    console.log(data);
  });
});


// check if in local storage user is logen in

var storedData = window.localStorage['f7form-'+ 'idlogin'];
if(!storedData) {
  app.loginScreen.open('#my-login-screen');
}