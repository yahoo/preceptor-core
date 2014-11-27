// Copyright 2014, Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var LogManager = require('../').LogManager;

var manager = new LogManager();

manager.addLogger("console");
manager.addLogger("file", { clear:true });
manager.addLogger("event").on('message', function (level, args, data) {
    console.log("EVENT: " + level + "-" + JSON.stringify(args) + " - " + (data ? data : "(Data not given)"));
});

manager.logger().info("Info message");
manager.logger().debug("Debug message");
manager.logger().warn("Warning message");
manager.logger().err("Error message");

manager.logger().log("warn", "Generic warning message");
