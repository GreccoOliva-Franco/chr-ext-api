export function csvToJson(csv) {
    var lines = csv.split("\n");
    var result = [];
    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].split(",");

        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }

        result.push(obj);
    }

    return result;
}

export function jsonToCsv(json) {
    var result, index, keys, columnDelimiter, lineDelimiter, data;

    data = json || null;

    if (data == null || !data.length) {
        return null;
    }

    columnDelimiter = ",";
    lineDelimiter = "\n";

    keys = Object.keys(data[0]);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach(function (item) {
        index = 0;
        keys.forEach(function (key) {
            if (index > 0) result += columnDelimiter;

            result += item[key];
            index++;
        });
        result += lineDelimiter;
    });

    return result;
}
