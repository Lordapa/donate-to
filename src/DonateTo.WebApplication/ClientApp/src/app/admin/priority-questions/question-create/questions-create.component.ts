import { ColumnItem, QuestionModel } from 'src/app/shared/models';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { ControlTypeModel } from 'src/app/shared/models/control-type.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionsSandbox } from '../questions-sandbox';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-questions-create',
  templateUrl: './questions-create.component.html',
  styleUrls: ['./questions-create.component.css'],
})
export class QuestionsCreateComponent implements OnInit, OnDestroy {
  @ViewChild('modalContent') public modalContent: TemplateRef<any>;
  @Input() questions: QuestionModel[] = [];
  @Output() validationResult = new EventEmitter<QuestionModel[]>();

  private subscriptions: Subscription[] = [];
  private isSubmited = false;
  private failedStatus = false;
  private controlTypes: ControlTypeModel[] = [];

  label = '';
  placeholder = '';
  weight = 0;
  order = 0;
  defaultValue = '';
  controlTypeId = 0;
  questionId = 0;
  isEdit = false;

  listOfColumns: ColumnItem[] = [
    { name: 'Admin.PriorityQuestion.Table.LabelColumn' },
    { name: 'Admin.PriorityQuestion.Table.PlaceholderColumn' },
    { name: 'Admin.PriorityQuestion.Table.OrderColumnColumn' },
    { name: 'Admin.PriorityQuestion.Table.WeightColumn' },
    { name: 'Admin.PriorityQuestion.Table.ControlTypeColumn' },
    { name: 'Admin.PriorityQuestion.Table.DefaultValueColumn' },
    { name: 'Admin.Action' },
  ];

  questionItemFormGroup = new FormGroup({
    labelFormControl: new FormControl('', Validators.required),
    placeholderFormControl: new FormControl('', Validators.required),
    weightFormControl: new FormControl('', Validators.required),
    orderFormControl: new FormControl('', Validators.required),
    controlTypeFormControl: new FormControl('', Validators.required),
    defaultValueFormControl: new FormControl(''),
    itemsFormControl: new FormControl(),
  });

  constructor(public questionSandbox: QuestionsSandbox, private router: Router) {}

  ngOnInit(): void {
    this.questionSandbox.loadControlTypes();
    this.questionSandbox.loadQuestions();
    this.registerEvents();
  }

  registerEvents(): void {
    this.subscriptions.push(
      this.questionSandbox.controlTypes$.subscribe((controlTypes) => {
        this.controlTypes = JSON.parse(JSON.stringify(controlTypes));
      })
    );

    this.subscriptions.push(
      this.questionSandbox.questions$.subscribe((questions) => {
        this.questions = [];
        questions.forEach((element) => {
          this.questions.push(element);
        });
      })
    );
  }

  resetForm(): void {
    this.label = undefined;
    this.placeholder = undefined;
    this.weight = undefined;
    this.order = undefined;
    this.defaultValue = undefined;
    this.controlTypeId = undefined;
    this.questionId = 0;
    this.isEdit = false;
  }

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  handleRequestResult() {
    if (this.isSubmited) {
      if (this.failedStatus) {
        this.isSubmited = false;
      } else {
        this.goBack();
      }
    }
  }

  createQuestions() {
    this.isSubmited = true;
    this.questions.forEach((question) => {
      question.controlType = undefined;
    });
    this.questionSandbox.updateQuestions(this.questions);
  }

  goBack() {
    this.router.navigate(['/admin/priority-questions']);
  }

  private validateFormGroup(formGroup: FormGroup) {
    for (const i in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(i)) {
        formGroup.controls[i].markAsDirty();
        formGroup.controls[i].updateValueAndValidity();
      }
    }
  }

  editQuestion(item: QuestionModel) {
    this.label = item.label;
    this.placeholder = item.placeholder;
    this.weight = item.weight;
    this.order = item.order;
    this.defaultValue = item.defaultValue;
    this.controlTypeId = item.controlTypeId;
    this.questionId = item.id;
    this.isEdit = true;
  }

  addQuestion() {
    this.validateFormGroup(this.questionItemFormGroup);
    if (this.questionItemFormGroup.valid) {
      const questionItem = new QuestionModel();

      if (this.isEdit) {
        const questionSavedItem = this.questions.find((q) => q.id === this.questionId);
        questionItem.label = this.questionItemFormGroup.controls.labelFormControl.value;
        questionItem.placeholder = this.questionItemFormGroup.controls.placeholderFormControl.value;
        questionItem.order = this.questionItemFormGroup.controls.orderFormControl.value;
        questionItem.controlType = new ControlTypeModel();
        questionItem.controlTypeId = this.questionItemFormGroup.controls.controlTypeFormControl.value;
        questionItem.controlType = this.controlTypes.find(
          (controlType) => controlType.id === questionItem.controlTypeId
        );
        questionItem.weight = this.questionItemFormGroup.controls.weightFormControl.value;
        questionItem.defaultValue = this.questionItemFormGroup.controls.defaultValueFormControl.value;

        questionItem.id = questionSavedItem.id;
        questionItem.key = questionSavedItem.key;
        questionItem.createdBy = questionSavedItem.createdBy;
        questionItem.createdDate = questionSavedItem.createdDate;
        questionItem.updateBy = questionSavedItem.updateBy;
        questionItem.updateDate = questionSavedItem.updateDate;

        this.questions.splice(
          this.questions.findIndex((element) => element.id === this.questionId),
          1
        );
        this.questions.push(questionItem);

        this.resetForm();
      } else {
        questionItem.label = this.questionItemFormGroup.controls.labelFormControl.value;
        questionItem.placeholder = this.questionItemFormGroup.controls.placeholderFormControl.value;
        questionItem.order = this.questionItemFormGroup.controls.orderFormControl.value;
        questionItem.controlType = new ControlTypeModel();
        questionItem.controlTypeId = this.questionItemFormGroup.controls.controlTypeFormControl.value;
        questionItem.controlType = this.controlTypes.find(
          (controlType) => controlType.id === questionItem.controlTypeId
        );
        questionItem.weight = this.questionItemFormGroup.controls.weightFormControl.value;
        questionItem.defaultValue = this.questionItemFormGroup.controls.defaultValueFormControl.value;

        this.questions = [...this.questions, questionItem];
      }
    }
  }

  sumWeight(): number {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return this.questions.map((q) => q.weight).reduce(reducer);
  }

  existOrder(order: number): boolean {
    return this.questions.map((q) => q.order).includes(order);
  }

  removeQuestion(item: QuestionModel): void {
    this.questions = this.questions.filter((q) => q !== item);
  }

  private unregisterEvents() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
