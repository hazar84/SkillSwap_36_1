// Импортируем JSON файлы
import categoriesJSON from './categories.json';
import subcategoriesJSON from './subcategories.json';
import skillsJSON from './skills.json';
import usersJSON from './users.json';

// Создаем переменные
const categories = categoriesJSON.categories;
const subcategories = subcategoriesJSON.subcategories;
const skills = skillsJSON.skills;
const users = usersJSON.users;

// Экспортируем все переменные
export {
    categories,
    subcategories,
    skills,
    users
};