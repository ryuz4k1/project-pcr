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


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
