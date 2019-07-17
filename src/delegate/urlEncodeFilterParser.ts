"use strict"

import parseQueryParams, { parseFilter, parseSort } from "json-api/build/src/steps/pre-query/parse-query-params"
import { ParserOperatorsConfig } from "json-api/build/src/types"
import { getQueryParamValue } from "json-api/build/src/util/query-parsing"

export function urlEncodeFilterParser( filterOps: ParserOperatorsConfig, rawQuery: string | undefined) {
    return getQueryParamValue("filter", decodeURIComponent(rawQuery)).
        map((it) => parseFilter(it, filterOps)).getOrDefault(undefined)
}
