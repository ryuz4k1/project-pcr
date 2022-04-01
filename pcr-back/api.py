#!/usr/bin/env python
# -*- coding: utf-8 -*-
__author__ = "Murat Özer"
__version__ = "3.8.9"
__email__ = "ozerr.murat@hotmail.com"


from flask import Flask, request, jsonify, abort
from flask_restful import Resource, Api
from flask_cors import CORS
import json


app = Flask(__name__)
api = Api(app)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

DATA_PATH = './data/pcr_region_coverage.json'

data = []
def read_json(path):
    f = open(path)
    data = json.load(f)
    f.close()
    return data;

def get_paginated_list(results, current_page_number, pagination_size):
    current_page_number = int(current_page_number)
    pagination_size = int(pagination_size)
    total_item_count = len(results)
    if total_item_count < current_page_number or pagination_size < 0:
        abort(404)
    obj = {}
    obj['pagination'] = {}
    obj['pagination']['current_item_count'] = pagination_size
    obj['pagination']['current_page_number'] = current_page_number
    obj['pagination']['pagination_size'] = pagination_size
    obj['pagination']['total_item_count'] = total_item_count
    obj['pagination']['total_page_count'] = total_item_count / pagination_size
    obj['items'] = results[((pagination_size * current_page_number) - pagination_size):(pagination_size * current_page_number)]
    return obj

class PCR(Resource):
    def get(self):
        return jsonify(get_paginated_list(
        data, 
        current_page_number=request.args.get('current_page_number', 1), 
        pagination_size=request.args.get('pagination_size', 10)
    ))

# Alternative api usage
# @app.route('/api/pcr', methods=['GET'])
# def get_list():
#     return jsonify(get_paginated_list(
#         data, 
#         current_page_number=request.args.get('current_page_number', 1), 
#         pagination_size=request.args.get('pagination_size', 10)
#     ))

api.add_resource(PCR, '/api/pcr')
data = read_json(DATA_PATH)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
    