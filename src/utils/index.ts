function interpolateString(template: string, replacements: { key: string, value: string }[]): string {
    replacements.forEach(({ key, value }) => {
        const regex = new RegExp(`\\[${key}\\]`, 'g');
        template = template.replace(regex, value);
    });
    return template;
}

export { interpolateString };