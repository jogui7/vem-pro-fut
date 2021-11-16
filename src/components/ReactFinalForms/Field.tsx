import { Field as RFFField } from 'react-final-form';

const defaultParse = (value: any) => value;

/*
 * O field do final-form possui um defaultParse, que quando é atribuida uma string vazia
 * o valor é convertido em valor undefined, e isso acaba gerando um problema, pois se é
 * aberta uma tela de edição e é apagado o valor de um campo, esse atributo deixa de
 * existir no payload, logo não é enviado ao backend e nem atualizado, assim voltando ao
 * valor anterior.
 *
 * See:
 *  https://github.com/final-form/react-final-form/issues/130
 *  https://github.com/final-form/react-final-form/blob/master/src/useField.js#L24
 */
const Field = (props: any) => <RFFField parse={defaultParse} {...props} />;
export default Field;
