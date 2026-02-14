import { FC } from 'react';
import { skillsData } from '../../../data/skills';
import SkillBar from './SkillBar';
import {
  SkillsContainer,
  Title,
  CategoriesGrid,
  Category,
  SkillsList,
} from './Skills.styles';

const Skills: FC = () => {
  const { categories } = skillsData;

  return (
    <SkillsContainer>
      <Title
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        skills
      </Title>
      <CategoriesGrid>
        {categories.map((category, index) => (
          <Category
            key={category.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <h4>{category.title}</h4>
            <SkillsList>
              {category.skills.map((skill) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  className={skill.className}
                />
              ))}
            </SkillsList>
          </Category>
        ))}
      </CategoriesGrid>
    </SkillsContainer>
  );
};

export default Skills;
