# Gulp Wordpress Starter ( SCSS Ветка )

Gulp сборка разработанная для разработки wordpress тем локально.
Основная функция сборки это автоматичское обновление css на сайте
при сохранении css файлов. При этом страница не перегружается 
и результат видно сразу.

При изменении .php файлов страница перегружается полностью.

## Использование
### Добавьте файлы к теме
Поместите содержимое репозитория в папку с темой wordpress.
Убедитесь что не будет конфликтов имен и директорий.


### Отключите кеширование
Для отключение кеширования при разработке подключите стили и скрипты даным способом:
```php
// Css Styles
if (!is_admin()) {
	$theme = wp_get_theme(); // Used for cache busting
	wp_enqueue_style('Style', get_template_directory_uri() . '/dist/styles.css', array(), $theme->get('Version'), 'all');
} else {
	wp_enqueue_style('Style', get_template_directory_uri() . '/dist/styles.css');
}
// JS Scripts
if (!is_admin()) {
	$theme = wp_get_theme(); // Used for cache busting
	wp_enqueue_script('m1_template-scripts', get_template_directory_uri() . '/dist/scripts.js', array(), $theme->get('Version'), 'all');
} else {
	wp_enqueue_script( 'm1_template-scripts', get_template_directory_uri() . '/dist/scripts.js');
}
```
### Найстройте gulpfile.js
Обезательно замените localhost.wp в вашем `gulpfile.js` на ваш локальный домен

### Запуск сборки
Дальше установите все пакеты npm и запускайте зборку
```
npm install
npm gulp
```


## Файловая структура
```
theme_folder
-scss
--libs-css.scss
--main.scss
--media.scss
-js
--libs-js.js
--common.js
-dist - тут будут содержатся файлы после запуска сборки
--style.css
--scripts.js


// Также файлы сборки для gulp:
package.js
package-lock.js
gulpfile.js
```

