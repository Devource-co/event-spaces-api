#!/bin/sh

yarn migration:run --transaction each

yarn seed:run --transaction each

yarn start
