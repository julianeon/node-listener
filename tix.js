
    exports.ticket_subject = function (hash){
      data=hash.data;
      incident=data.incident;
      var strsubject="PagerDuty Alert: Incident " + incident.id + " - " + incident.status;
      return strsubject;
    }

    exports.get_status = function (hash){
      data=hash.data;
      incident=data.incident;
      return incident.status;
    }

    exports.ticket_body = function (hash){
      state_type=hash.type;
      data=hash.data;
      incident=data.incident;
      service=incident.service;
      escalator=incident.escalation_policy;
      assigned_user=incident.assigned_to_user;
      about_trigger=incident.trigger_summary_data;
      var strbody= "Incident has been " + incident.status + ".\n";
      strbody+= "ID: " + incident.id + "\n"; 
      strbody+= "No.: " + incident.incident_number + "\n"; 
      strbody+= "Created on: " + incident.created_on.replace(/[A-Z]/g," ") + "\n"; 
      strbody+="\n";
      strbody+= "By this service.\n"
      strbody+= "Name: " + service.name + "\n";
      strbody+= "ID: " + service.id + "\n";
      strbody+="\n";
      strbody+= "Using this escalation policy.\n";
      strbody+= "Name: " + escalator.name + "\n";
      strbody+= "ID: " + escalator.id + "\n";
      strbody+="\n";
      if (typeof assigned_user!=='undefined' && assigned_user!=null) {
        strbody+= "Assigned to this user.\n"
        strbody+= "Name: " + assigned_user.name + "\n";
        strbody+= "Email: " + assigned_user.email + "\n";
        strbody+= "ID: " + assigned_user.id + "\n";
        strbody+="\n";
      }
      strbody+= "Triggered by this event.\n"
      strbody+= "Subject: " + about_trigger.subject + "\n";
      strbody+= "From: " + incident.trigger_type.replace(/_/," ") + "\n";
      strbody+= "Last change.\n";
      strbody+= "On: " + incident.last_status_change_on.replace(/[A-Z]/g, " ") + "\n";
      strbody+= "Number of escalations: " + incident.number_of_escalations + "\n";
      strbody+="\n";
      strbody+=state_type+"\n";
      return strbody;
    }
  
    exports.ticket_action = function (hook_status){
      if (hook_status==='triggered'){
        console.log('trigyo');
      }
    }
    
 
