$(function () {
  const JOB_FIELDS = $("#job_fields");
  const JOB_LAST_FIELD_INPUT = $("#job_fields > .last > input");
  const JOB_LAST_FIELD_LABEL_INPUT = $("#job_fields > .last > label > input");

  if(JOB_FIELDS){
    JOB_LAST_FIELD_INPUT.attr('placeholder', 'ご職業を入力してください')
    if(!JOB_LAST_FIELD_LABEL_INPUT.prop("checked")){
      JOB_LAST_FIELD_INPUT.css("display", "none");
    }

    JOB_LAST_FIELD_LABEL_INPUT.on('click', function() {
      JOB_LAST_FIELD_INPUT.toggle();

      // その他のチェックボックスが外れたら入力値を空にする
      if(JOB_LAST_FIELD_INPUT.css("display") === "none") {
        JOB_LAST_FIELD_INPUT.val('');
      }else{
        return;
      }

    });
  }
});
