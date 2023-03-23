import type { Maybe } from '../jsutils/Maybe.js';
import type { GraphQLError } from '../error/GraphQLError.js';
import type {
  DocumentNode,
  FragmentDefinitionNode,
  FragmentSpreadNode,
  OperationDefinitionNode,
  SelectionSetNode,
  VariableNode,
} from '../language/ast.js';
import type { ASTVisitor } from '../language/visitor.js';
import type {
  GraphQLArgument,
  GraphQLCompositeType,
  GraphQLEnumValue,
  GraphQLField,
  GraphQLInputType,
  GraphQLOutputType,
} from '../type/definition.js';
import type { GraphQLDirective } from '../type/directives.js';
import type { GraphQLSchema } from '../type/schema.js';
import { TypeInfo } from '../utilities/TypeInfo.js';
type NodeWithSelectionSet = OperationDefinitionNode | FragmentDefinitionNode;
interface VariableUsage {
  readonly node: VariableNode;
  readonly type: Maybe<GraphQLInputType>;
  readonly defaultValue: Maybe<unknown>;
}
/**
 * An instance of this class is passed as the "this" context to all validators,
 * allowing access to commonly useful contextual information from within a
 * validation rule.
 */
export declare class ASTValidationContext {
  private _ast;
  private _onError;
  private _fragments;
  private _fragmentSpreads;
  private _recursivelyReferencedFragments;
  constructor(ast: DocumentNode, onError: (error: GraphQLError) => void);
  get [Symbol.toStringTag](): string;
  reportError(error: GraphQLError): void;
  getDocument(): DocumentNode;
  getFragment(name: string): Maybe<FragmentDefinitionNode>;
  getFragmentSpreads(node: SelectionSetNode): ReadonlyArray<FragmentSpreadNode>;
  getRecursivelyReferencedFragments(
    operation: OperationDefinitionNode,
  ): ReadonlyArray<FragmentDefinitionNode>;
}
export type ASTValidationRule = (context: ASTValidationContext) => ASTVisitor;
export declare class SDLValidationContext extends ASTValidationContext {
  private _schema;
  constructor(
    ast: DocumentNode,
    schema: Maybe<GraphQLSchema>,
    onError: (error: GraphQLError) => void,
  );
  get [Symbol.toStringTag](): string;
  getSchema(): Maybe<GraphQLSchema>;
}
export type SDLValidationRule = (context: SDLValidationContext) => ASTVisitor;
export declare class ValidationContext extends ASTValidationContext {
  private _schema;
  private _typeInfo;
  private _variableUsages;
  private _recursiveVariableUsages;
  constructor(
    schema: GraphQLSchema,
    ast: DocumentNode,
    typeInfo: TypeInfo,
    onError: (error: GraphQLError) => void,
  );
  get [Symbol.toStringTag](): string;
  getSchema(): GraphQLSchema;
  getVariableUsages(node: NodeWithSelectionSet): ReadonlyArray<VariableUsage>;
  getRecursiveVariableUsages(
    operation: OperationDefinitionNode,
  ): ReadonlyArray<VariableUsage>;
  getType(): Maybe<GraphQLOutputType>;
  getParentType(): Maybe<GraphQLCompositeType>;
  getInputType(): Maybe<GraphQLInputType>;
  getParentInputType(): Maybe<GraphQLInputType>;
  getFieldDef(): Maybe<GraphQLField<unknown, unknown>>;
  getDirective(): Maybe<GraphQLDirective>;
  getArgument(): Maybe<GraphQLArgument>;
  getEnumValue(): Maybe<GraphQLEnumValue>;
}
export type ValidationRule = (context: ValidationContext) => ASTVisitor;
export {};