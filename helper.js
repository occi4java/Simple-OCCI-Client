/*
The MIT License

Copyright (c) 2011 Sebastian Herbermann

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/**
 * Adds an empty() method to strings.
 * @returns {Boolean}
 */
String.prototype.empty = function() {
	return this.length == 0;
};


/**
 * Asks the user for input. Optional parameters may be ignored or be null.
 * @param description The description for the text to be entered.
 * @param defaultValue A default value (optional).
 * @param validator A function that validates the input (optional), e.g. <code>function(s) { return true; }</code>.
 * @param errorMessage A message to display if the value was not correct (optional).
 * @returns string
 */
function promptSecure(description, defaultValue, validator, errorMessage) {
	var firstRun = true;
	var s;
	
	if (typeof defaultValue == "undefined" || defaultValue == null) {
		defaultValue = "";
	}
	
	// no validator present
	if (typeof validator != "function") {
		s = prompt(description + (defaultValue.empty() ? "" : " (default: "+defaultValue+")"));
		if (s == null || s.empty()) {
			s = defaultValue;
		}
		return s;
	}
	
	// validator present
	do {
		if (!firstRun && typeof errorMessage != "undefined" && errorMessage != null) {
			s = prompt(description + (defaultValue.empty() ? "" : " (default: "+defaultValue+")") + "\n"+errorMessage);
			if (s == null || s.empty()) {
				s = defaultValue;
			}
		} else {
			s = prompt(description + (defaultValue.empty() ? "" : " (default: "+defaultValue+")"));
			if (s == null || s.empty()) {
				s = defaultValue;
			}
			firstRun = false;
		}
	} while (!validator(s));
	return s;
}


/**
 * Converts the given HTTP status to the textual representation. Returns an empty string for invalid statuses.
 * @param status
 * @returns {String}
 */
function getHttpStatusText(status) {
	switch (status) {
		case 100: return "Continue";
		case 101: return "Switching Protocols";
		case 102: return "Processing";
		case 122: return "Request-URI too long";
		case 200: return "OK";
		case 201: return "Created";
		case 202: return "Accepted";
		case 203: return "Non-Authoritative Information";
		case 204: return "No Content";
		case 205: return "Reset Content";
		case 206: return "Partial Content";
		case 207: return "Multi-Status";
		case 226: return "IM Used";
		case 300: return "Multiple Choices";
		case 301: return "Moved Permanently";
		case 302: return "Found";
		case 303: return "See Other";
		case 304: return "Not Modified";
		case 305: return "Use Proxy";
		case 306: return "Switch Proxy";
		case 307: return "Temporary Redirect";
		case 400: return "Bad Request";
		case 401: return "Unauthorized";
		case 402: return "Payment Required";
		case 403: return "Forbidden";
		case 404: return "Not Found";
		case 405: return "Method Not Allowed";
		case 406: return "Not Acceptable";
		case 407: return "Proxy Authentication Required";
		case 408: return "Request Timeout";
		case 409: return "Conflict";
		case 410: return "Gone";
		case 411: return "Length Required";
		case 412: return "Precondition Failed";
		case 413: return "Request Entity Too Large";
		case 414: return "Request-URI Too Long";
		case 415: return "Unsupported Media Type";
		case 416: return "Requested Range Not Satisfiable";
		case 417: return "Expectation Failed";
		case 418: return "I'm a teapot";
		case 422: return "Unprocessable Entity";
		case 423: return "Locked";
		case 424: return "Failed Dependency";
		case 425: return "Unordered Collection";
		case 426: return "Upgrade Required";
		case 444: return "No Response";
		case 449: return "Retry With";
		case 450: return "Blocked by Windows Parental Controls";
		case 499: return "Client Closed Request";
		case 500: return "Internal Server Error";
		case 501: return "Not Implemented";
		case 502: return "Bad Gateway";
		case 503: return "Service Unavailable";
		case 504: return "Gateway Timeout";
		case 505: return "HTTP Version Not Supported";
		case 506: return "Variant Also Negotiates";
		case 507: return "Insufficient Storage";
		case 509: return "Bandwidth Limit Exceeded";
		case 510: return "Not Extended";
	}
	return "";
}