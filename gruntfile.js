 /*jshint esversion: 6 */
 var mozjpeg = require('imagemin-mozjpeg');
 module.exports = function(grunt) {
   grunt.initConfig({
     pkg: grunt.file.readJSON("package.json"),
     sass: {
       dist: {
         files: {
           "dist/css/style.css": "sass/style.scss"
         }
       }
     },
     cssmin: {
       minify: {
         src: "dist/css/style.css",
         dest: "dist/css/minified/style.min.css"
       }
     },
     browserSync: {
       dev: {
         bsFiles: {
           src: [
             "dist/css/minified/style.min.css",
             "*.html"
           ]
         },
         options: {
           watchTask: true,
           server: "./"
         }
       }
     },
     imagemin: {
       dist: {

         options: [{
           optimizationLevel: 9,
           progressive: true,
           use: [mozjpeg({
             quality: 50
           })]
         }],

         files: [{
           expand: true,
           cwd: "./images",
           src: "**/*.{jpg,JPG}",
           dest: "minified_images"
         }]
       },
     },
     watch: {
       css: {
         files: "sass/style.scss",
         tasks: ["sass", "cssmin"]
       }
     }
   });
   grunt.loadNpmTasks("grunt-contrib-sass");
   grunt.loadNpmTasks("grunt-contrib-watch");
   grunt.loadNpmTasks("grunt-contrib-cssmin");
   grunt.loadNpmTasks("grunt-contrib-imagemin");
   grunt.loadNpmTasks("grunt-browser-sync");
   grunt.registerTask("default", ["browserSync", "watch", "imagemin"]);
 };
