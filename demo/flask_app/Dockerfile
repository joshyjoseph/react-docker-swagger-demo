FROM python:3.8-slim-buster

WORKDIR /flask_api

COPY ./flask_api/requirements.txt /flask_api/

RUN pip3 install -r /flask_api/requirements.txt

COPY ./flask_api /flask_api

CMD [ "python", "main.py" ]
