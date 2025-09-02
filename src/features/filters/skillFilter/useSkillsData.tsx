import { useState, useEffect } from 'react';

import type { TCategory, TSubcategory } from '../../../shared/lib/types';
import { getCategories } from '../../../api/categories-api';
import { getSubcategories } from '../../../api/subcategories-api';


export type TCategoryWithSubcategories = TCategory & {
  subcategories: TSubcategory[];
};

export const useSkillsData = () => {
    const [skills, setSkills] = useState<TCategoryWithSubcategories[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Улучшение: Использование async/await для более чистого асинхронного кода
        const fetchData = async () => {
            try {
                // 1. Запускаем запросы параллельно
                const [categoriesResponse, subcategoriesResponse] = await Promise.all([
                    getCategories(),
                    getSubcategories(),
                ]);

                // 2. Улучшение: Проверяем на ошибки и выбрасываем первую найденную, чтобы попасть в catch
                if (!categoriesResponse.success) throw new Error(categoriesResponse.error.message);
                if (!subcategoriesResponse.success) throw new Error(subcategoriesResponse.error.message);
                
                const { data: categories } = categoriesResponse;
                const { data: subcategories } = subcategoriesResponse;
                
                // 3. Улучшение: Оптимизация объединения данных.
                // Создаем карту подкатегорий для быстрого доступа вместо фильтрации на каждой итерации.
                const subcategoriesByCategoryId = subcategories.reduce((acc, sub) => {
                    (acc[sub.categoryId] = acc[sub.categoryId] || []).push(sub);
                    return acc;
                }, {} as Record<string, TSubcategory[]>);

                const combinedData = categories.map(category => ({
                    ...category,
                    subcategories: subcategoriesByCategoryId[category.id] || [],
                }));

                setSkills(combinedData);
            } catch (e: any) {
                setError(e.message || 'Не удалось загрузить данные');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []); // Пустой массив зависимостей гарантирует вызов только один раз

    return { skills, isLoading, error };
};
