[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

# Angular Fast i18n

Angular Fast i18n let's your Angular application support internationalization in a simple and easy way!

## Demo page

http://bahaaldine.github.io/angular-fast-i18n

## Installation

#### Depedencies
Install depedencies using bower: 
```
bower install angular-fast-i18n
```

Add js libraries to your application:
```html
	...
	<script src="bower_components/angular-fast-i18n/dist/angular-fast-i18n.js"></script>
    ...
```

#### Angular module
Add ngFastI18n module to your application
```javascript
	...
	angular
	  .module('myAwesomeApp', [
	    ...
	    'ngFastI18n',
	    ...
	  ])
	...
```

#### Language file
Create a **i18n/languages** directory in the root of your web application.
Then place corresponding language JSON file. File names should be in 2 letters, like the following examples: en.json, fr.json, de.json, ch.json ...etc.

Here is a snippet of a language file:

```javascript
{
    "id": "en"
    "header": {
        "moto": "a better internationalization",
        "actions": {
            "signin": "Sign </b>In</b>",
            "signup": "Getting Started"
        },
        "sex": {
            "male": "Man",
            "female": "Woman",
        }
        "search": "Search anything",
        
    }
    ...
}
```

## Usage
Angular Fast i18n supports : 
- Simple text
- Input Value
- Input placeholder
- HTML
- Classname

You just need to place the **lng** attribute on your HTML element and use the proper mode:

#### Simple text

You can translate the content of an HTML element like this:

```html
<h1 lng="text:header.moto"></h1>
```

#### Input value

```html
<input type="text" lng="value:header.sex.male"/>
```

#### Placeholder
```html
<input type="text" lng="placeholder:header.search"/>
```

#### HTML
In this example the content of the div will be "Sigin **in**"
```html
<div lng="html:header.actions.signin"></div>
```

#### Classname

That one will change the class of the element depending on the value stored
in JSON file. In the following example, we change the class of the icon div element to show the related language flag.
```html
<div class="icon language" lng="classname:id"></div>
```
