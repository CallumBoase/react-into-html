export default function getMultiChoiceOptionsFromKnackField(fieldId){
    const field = window.Knack.fields[fieldId];
    const isMultiChoice = field.attributes.type === 'multi_choice';
    if(!isMultiChoice) return null;
    const options = field.attributes.format.options;
    return options;
}