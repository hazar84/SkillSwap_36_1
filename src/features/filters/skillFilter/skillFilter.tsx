import React, { useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { filtersActions, selectSkillIds } from '../model/filtersSlice';
import { useSkillsData, type TCategoryWithSubcategories } from './useSkillsData';
import { SkillsFilterUI } from './skillFilterUI';

const CATEGORIES_TO_SHOW_BY_DEFAULT = 6;

export const SkillsFilter: React.FC = () => {
    const dispatch = useDispatch();
    const { skills, isLoading, error } = useSkillsData();
    const selectedSkillIds = useSelector(selectSkillIds);

    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
    const [isAllCategoriesOpen, setIsAllCategoriesOpen] = useState(false);
    const [activatedCategories, setActivatedCategories] = useState<Set<string>>(new Set());

    const categoryCheckboxStates = useMemo(() => {
        const states: Record<string, 'empty' | 'partial' | 'checked'> = {};
        for (const category of skills) {
            const subcategoryIds = category.subcategories.map(sc => sc.id);
            const totalSubcategories = subcategoryIds.length;
            
            if (totalSubcategories === 0) {
                states[category.id] = 'empty'; continue;
            }
            
            const selectedCount = subcategoryIds.filter(id => selectedSkillIds.includes(id)).length;

            if (selectedCount === totalSubcategories) {
                states[category.id] = 'checked';
            } else if (selectedCount > 0 || activatedCategories.has(category.id)) {
                states[category.id] = 'partial';
            } else {
                states[category.id] = 'empty';
            }
        }
        return states;
    }, [selectedSkillIds, skills, activatedCategories]);
    
    // Улучшение: Мемоизация колбэков, чтобы они не создавались заново при каждом рендере
    const handleToggleAllCategories = useCallback(() => {
        setIsAllCategoriesOpen(prev => !prev);
    }, []);

    const handleCategoryClick = useCallback((category: TCategoryWithSubcategories) => {
        const currentState = categoryCheckboxStates[category.id];
        
        if (currentState === 'checked' || currentState === 'partial') {
            setExpandedCategories(prev => { const newSet = new Set(prev); newSet.delete(category.id); return newSet; });
            setActivatedCategories(prev => { const newSet = new Set(prev); newSet.delete(category.id); return newSet; });
            const subcategoryIds = category.subcategories.map(sc => sc.id);
            const newSelectedSkillIds = selectedSkillIds.filter(id => !subcategoryIds.includes(id));
            dispatch(filtersActions.setSkillIds(newSelectedSkillIds));
        } else {
            setExpandedCategories(prev => new Set(prev).add(category.id));
            setActivatedCategories(prev => new Set(prev).add(category.id));
        }
    }, [categoryCheckboxStates, dispatch, selectedSkillIds]);

    const handleSelectSubcategory = useCallback((subcategoryId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const newSelectedSkillIds = selectedSkillIds.includes(subcategoryId)
            ? selectedSkillIds.filter(id => id !== subcategoryId)
            : [...selectedSkillIds, subcategoryId];
        dispatch(filtersActions.setSkillIds(newSelectedSkillIds));
    }, [selectedSkillIds, dispatch]);

    const skillsToRender = isAllCategoriesOpen ? skills : skills.slice(0, CATEGORIES_TO_SHOW_BY_DEFAULT);

    return (
        <SkillsFilterUI
            skills={skillsToRender}
            isLoading={isLoading}
            error={error}
            selectedSkillIds={selectedSkillIds}
            expandedCategories={expandedCategories}
            categoryCheckboxStates={categoryCheckboxStates}
            onCategoryClick={handleCategoryClick}
            onSelectSubcategory={handleSelectSubcategory}
            isAllCategoriesOpen={isAllCategoriesOpen}
            onToggleAllCategories={handleToggleAllCategories}
            canShowMore={true}
        />
    );
};