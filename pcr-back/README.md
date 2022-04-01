# Flask API

### Dependencies

* [Python](https://www.python.org/) - Programming Language
* [Flask](https://flask.palletsprojects.com/) - The framework used
* [Pip](https://pypi.org/project/pip/) - Dependency Management
* [RESTful](https://restfulapi.net/) - REST docs


### Docker enviroments

```
$ docker build -t pcr-back-service .
$ docker-compose up
```

The dockerized flask-api application is now up and running. You can access the containerized application from your browser by navigating to:

```
http://localhost:8000
```

### Virtual environments

```
$ sudo apt-get install python-virtualenv
$ python3 -m venv venv
$ . venv/bin/activate
$ pip install Flask
```

Install all project dependencies using:

```
$ pip install -r requirements.txt
```

### Running
 
```
$ export FLASK_APP=app.py
$ export FLASK_ENV=development
$ python -m flask run
```

This launches a very simple builtin server, which is good enough for testing but probably not what you want to use in production.

If you enable debug support the server will reload itself on code changes, and it will also provide you with a helpful debugger if things go wrong.

If you have the debugger disabled or trust the users on your network, you can make the server publicly available simply by adding --host=0.0.0.0 to the command line:

```
flask run --host=0.0.0.0
```


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details